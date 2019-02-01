// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata"
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "study"
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.canvas.Screen",
      "content": [
        {
          "type": "image",
          "version": "2.4.4",
          "originX": "center",
          "originY": "center",
          "left": 0,
          "top": 0,
          "width": 380.73,
          "height": 285.18,
          "fill": "black",
          "stroke": null,
          "strokeWidth": 0,
          "strokeDashArray": null,
          "strokeLineCap": "butt",
          "strokeDashOffset": 0,
          "strokeLineJoin": "round",
          "strokeMiterLimit": 4,
          "scaleX": 1.47,
          "scaleY": 1.47,
          "angle": 0,
          "flipX": false,
          "flipY": false,
          "opacity": 1,
          "shadow": null,
          "visible": true,
          "clipTo": null,
          "backgroundColor": "",
          "fillRule": "nonzero",
          "paintFirst": "fill",
          "globalCompositeOperation": "source-over",
          "transformMatrix": null,
          "skewX": 0,
          "skewY": 0,
          "crossOrigin": "",
          "cropX": 0,
          "cropY": 0,
          "id": "3",
          "src": "${ this.files[\"stopsignal.jpg\"] }",
          "filters": [],
          "naturalWidth": 259,
          "naturalHeight": 194
        }
      ],
      "files": {
        "stopsignal.jpg": "https://www.gstatic.com/earth/social/00_generic_facebook-001.jpg"
      },
      "parameters": {},
      "responses": {},
      "messageHandlers": {},
      "viewport": [
        800,
        600
      ],
      "title": "Screen",
      "timeout": "3000"
    }
  ]
})

// Let's go!
study.run()
