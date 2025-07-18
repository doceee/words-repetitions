FROM libretranslate/libretranslate:v1.6.2

ARG LT_LOAD_ONLY="pl,en,de"
ARG LT_UPDATE_MODELS=false
ARG LT_PORT=5000
ARG LT_DISABLE_WEB_UI=true

ENV LT_LOAD_ONLY=${LT_LOAD_ONLY}
ENV LT_UPDATE_MODELS=${LT_UPDATE_MODELS}
ENV LT_DISABLE_WEB_UI=${LT_DISABLE_WEB_UI}
ENV LT_PORT=${LT_PORT}

EXPOSE $LT_PORT

ENTRYPOINT /bin/sh -c "\
  ./venv/bin/python scripts/install_models.py --load_only_lang_codes '${LT_LOAD_ONLY}' && \
  ./venv/bin/libretranslate --host '*'"

HEALTHCHECK --interval=30s --timeout=20s --start-period=30s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${LT_PORT}/languages || exit 1
