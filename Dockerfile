FROM node
#  Tini to handle zombie processes
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini.asc /tini.asc
RUN \
  gpg --batch --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 595E85A6B1B4779EA4DAAEC70B588DFF0527A9B7 && \
  gpg --batch --verify /tini.asc /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]
USER node

# Clone the repo
RUN git clone https://github.com/softeria-test/grid-view-ts.git ~/grid-view
WORKDIR /home/node/grid-view

EXPOSE 8080
RUN yarn
CMD yarn serve