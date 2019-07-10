FROM ruby:2.6.3-stretch

RUN apt-get update -qq && apt-get install -y \
postgresql-client graphicsmagick pdftk ghostscript \
poppler-utils poppler-data tesseract-ocr

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
&& apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install yarn

RUN mkdir /dock_api
RUN mkdir /dock_api/client
# build rails backend
WORKDIR /dock_api
COPY ./api/Gemfile /dock_api/Gemfile
COPY ./api/Gemfile.lock /dock_api/Gemfile.lock
RUN gem install bundler
RUN bundle install
COPY ./api/ /dock_api/
COPY ./api/entrypoint.sh /usr/bin
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# build js client
COPY ./app/ /dock_api/client/
RUN cd client && yarn install && yarn build && cp -a build/. /dock_api/public/

EXPOSE 4002

CMD ["bundle", "exec", "rails", "server", "-p", "4002", "-b", "0.0.0.0"]
