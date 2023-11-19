FROM python:3.10.9-slim-buster as base 

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1

FROM base AS python-deps

# Install pipenv and compilation dependencies
RUN apt-get -y update && \
    apt-get install -y bash && \ 
    apt-get install -y --no-install-recommends gcc && \
    apt-get clean

RUN pip install --upgrade pip && pip install pipenv 

# Install python dependencies in /.venv
COPY Pipfile .
COPY Pipfile.lock .
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

FROM base AS runtime

# Copy virtual env from python-deps stage
COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Install other dependecies
RUN apt-get -y update && \
    apt-get install -y --no-install-recommends ffmpeg && \ 
    apt-get clean 

# Create and switch to a new user
RUN useradd --create-home appuser
WORKDIR /home/appuser/backend
ENV HOME=/home/appuser
ENV APP_HOME=/home/appuser/backend


# Install application into container
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g'  $APP_HOME/entrypoint.sh
RUN chmod +x ./entrypoint.sh
RUN chown -R appuser:appuser $APP_HOME
USER appuser

COPY . .

# Run the application
# CMD ["manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT ["./entrypoint.sh"]