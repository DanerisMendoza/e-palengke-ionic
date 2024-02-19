<template>
  <div style="display: none"></div>
</template>

<script>
import { ref, markRaw, inject, nextTick, onMounted, onBeforeUnmount, computed, watch } from "vue";
import { routingControlProps, setupRoutingControl } from "./routingControl";
import { Utilities, InjectionKeys } from "@vue-leaflet/vue-leaflet";
import "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useStore } from 'vuex';

export default {
  name: "LRoutingMachine",
  props: {
    ...routingControlProps,
  },
  setup(props, context) {
    const { UseGlobalLeafletInjection, RegisterControlInjection } = InjectionKeys;
    const { WINDOW_OR_GLOBAL, assertInject, propsBinder, remapEvents } = Utilities;

    const useGlobalLeaflet = inject(UseGlobalLeafletInjection);
    const registerControl = assertInject(RegisterControlInjection);

    const leafletObject = ref(null);
    const { options, methods } = setupRoutingControl(props);
    const { routing } = WINDOW_OR_GLOBAL.L
    const { listeners } = remapEvents(context.attrs);
    const SELECTED_STORE = computed(() => store.getters.SELECTED_STORE);
    const STORE_TYPE_FILTER = computed(() => store.getters.STORE_TYPE_FILTER);
    const store = useStore();

    onMounted(async () => {

      // Set createMarker to empty function to prevent marker creation
      // options.createMarker = () => { };

      // leafletObject.value = markRaw(routing.control(options));
      // leafletObject.value.on(listeners);

      // propsBinder(methods, leafletObject.value, props);
      // registerControl({ leafletObject: leafletObject.value });
      // nextTick(() => context.emit("ready", leafletObject.value));
    });

    watch(() => STORE_TYPE_FILTER.value, (newVal, oldVal) => {
      if (leafletObject.value) {
        leafletObject.value.setWaypoints([]);
        leafletObject.value.remove();
      }
    });

    watch(() => SELECTED_STORE.value, (newVal, oldVal) => {
      if (newVal == null) {
        leafletObject.value.setWaypoints([]);
        leafletObject.value.remove();
      }
      else{
        options.createMarker = () => { };
        leafletObject.value = markRaw(routing.control(options));
        leafletObject.value.on(listeners);      
        propsBinder(methods, leafletObject.value, props);
        registerControl({ leafletObject: leafletObject.value });
        nextTick(() => context.emit("ready", leafletObject.value));
      }
    });

    onBeforeUnmount(() => {
      if (leafletObject.value) {
        leafletObject.value.setWaypoints([]);
        leafletObject.value.remove();
      }
    });
  },
};
</script>

