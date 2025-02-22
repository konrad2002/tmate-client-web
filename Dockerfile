FROM nginx
COPY dist/tmate-web-client/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

COPY public/favicon /usr/share/nginx/html/

ARG VERSION="HEAD"
ARG BRANCH="LOCAL"

# to store the value as environment variable in the image
ENV TMATE_CLIENT_WEB_BUILD_DATE=$now

RUN rm -f /usr/share/nginx/html/release.txt
RUN touch /usr/share/nginx/html/release.txt
RUN echo $(date) > /usr/share/nginx/html/release.txt

RUN rm -f /usr/share/nginx/html/version.txt
RUN touch /usr/share/nginx/html/version.txt
RUN echo $VERSION > /usr/share/nginx/html/version.txt

EXPOSE 80
