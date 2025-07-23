FROM libretranslate/libretranslate:v1.6.2

ARG LT_LOAD_ONLY="pl,en"
ARG LT_UPDATE_MODELS=false
ARG LT_PORT=5000
ARG LT_DISABLE_WEB_UI=true

ENV LT_LOAD_ONLY=${LT_LOAD_ONLY}
ENV LT_UPDATE_MODELS=${LT_UPDATE_MODELS}
ENV LT_DISABLE_WEB_UI=${LT_DISABLE_WEB_UI}
ENV LT_PORT=${LT_PORT}

EXPOSE 5000

ENTRYPOINT /bin/sh -c "\
  ./venv/bin/python scripts/install_models.py --load_only_lang_codes '${LT_LOAD_ONLY}' && \
  ./venv/bin/libretranslate --host '*'"
