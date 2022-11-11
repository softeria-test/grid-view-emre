FROM node

USER node

# Clone the repo
RUN git clone https://github.com/softeria-test/grid-view-ts.git ~/grid-view
WORKDIR /home/node/grid-view

EXPOSE 8080
RUN yarn
CMD yarn serve