FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# RUN useradd --create-home appuser
WORKDIR /home/appuser/
ENV HOME=/home/appuser
ENV APP_HOME=/home/appuser/backend


# USER appuser
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles
