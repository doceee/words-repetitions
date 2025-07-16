#!/usr/bin/env bash

set -euo pipefail

EXAMPLE_ENV="./.env.example"
TARGET_ENV="./.env"
FOLDERS=("backend" "frontend" "landing")

[[ -f $EXAMPLE_ENV ]] || { echo "❌ $EXAMPLE_ENV not found"; exit 1; } 

if [[ -f $TARGET_ENV ]]; then
  read -p "⚠️  .env file found. Do you want to update the file? (y/n) " yn

  case $yn in 
    [yY] | [yY][eE][sS] ) ;;
    * ) echo Exiting...;
      exit;;
  esac
fi

mapfile -t main_lines < "$EXAMPLE_ENV"

clean_val() {
  local val="$1"
  val="${val#\"}"; val="${val%\"}"
  val="${val#\'}"; val="${val%\'}"
  val="${val#\$\{}"
  val="${val%"${val##*[![:space:]]}"}"
  val="${val%\}}"
  echo "$val"
}

for dir in "${FOLDERS[@]}"; do
  envfile="$dir/.env"
  [[ -f "$envfile" ]] || { echo "⚠️  File $envfile not found."; continue; }
  echo "📂 Processing $envfile"

  declare -A env_map=()
  while IFS='=' read -r var val; do
    [[ -z "$var" || "$var" =~ ^# ]] && continue

    var="${var//[$'\t\r\n ']}"
    val="$(clean_val "$val")"

    env_map["$var"]="$val"
  done < "$envfile"


  for i in "${!main_lines[@]}"; do
    line="${main_lines[$i]}"
    [[ -z "$line" || $line =~ ^# ]] && continue

    IFS='=' read -r main_line_var main_line_val <<< "$line"
    valid_val_to_replace="$(clean_val "$main_line_val")"
    
    if [[ -n "$valid_val_to_replace" && -n "${env_map[$valid_val_to_replace]:-}" ]]; then
      echo "  🔧 Variable replaced: '$valid_val_to_replace'"
      main_lines[$i]="$main_line_var=${env_map[$valid_val_to_replace]}"
    fi
  done

  unset env_map
done

printf "%s\n" "${main_lines[@]}" > $TARGET_ENV
echo "✅ Finished actualising $TARGET_ENV"
