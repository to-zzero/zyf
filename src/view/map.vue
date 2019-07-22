<template>
  <div id="map" ref="map" class="map"></div>
</template>

<script>
import ol from "ol";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Tile from "ol/layer/Tile.js";
import WMTS, { optionsFromCapabilities } from "ol/source/WMTS";
import tilegrid from "ol/tilegrid/WMTS";
import { XYZ } from "ol/source.js";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import axios from "axios";

export default {
  props: ["url", "name"],
  data() {
    return {
      map: null
    };
  },
  mounted() {
    axios
      .create({ baseURL: null })
      .get(`${this.url}/wmts?reques=wmts&method=WMTSCapabilities`)
      .then(resp => {
        var parser = new WMTSCapabilities();
        var result = parser.read(resp.data);
        var opt = optionsFromCapabilities(result, {
          layer: this.name
        });
        map.addLayer(
          new Tile({
            source: new WMTS(opt)
          })
        );
      });

    axios
      .create({ baseURL: null })
      .get(`${this.url}` + `?f=json`)
      .then(resp => {
        return;
        let url_wmts = `${this.url}/WMTS/tile/1.0.0/${this.name}/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png`;
        var grid = new tilegrid({
          resolutions: resp.data.tileInfo.lods.map(r => r.resolution),
          origin: resp.data.tileInfo.origin,
          tileSize: 256,
          matrixIds: resp.data.tileInfo.lods.map(r => r.level)
        });
        console.log(grid);
        debugger;
        var layer = new Tile({
          source: new WMTS({
            name: this.name,
            tileGrid: tilegrid,
            matrixSet: "default028mm",
            projection: "EPSG:4326",
            layer: this.name,
            style: "default",
            version: "1.0.0",
            format: "image/png",
            requestEncoding: "REST",
            url: url_wmts
          })
        });
        this.map.addLayer(layer);
      });
    this.map = new Map({
      layers: [],
      target: this.$refs.map,
      view: new View({
        center: [108, 35],
        zoom: 5,
        projection: "EPSG:4326"
      })
    });
    window.map = this.map;
  }
};
</script>

<style>
</style>
