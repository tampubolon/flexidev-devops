import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    data() {
        return {
            loader: { count: 0, stroke: 7, diameter: 50, value: false }
        };
    },
    methods: {
        load() {
            this.loader.count++;
            this.loader.value = true;
        },
        unload() {
            this.loader.count--;
            if (this.loader.count < 0) {
                this.loader.count = 0;
            }
            this.loader.value = this.loader.count > 0;
        },
        clone(object) {
            return JSON.parse(JSON.stringify(object));
        },
        ellipsify(text, limit) {
            if (text && text.length > limit) {
                return text.substring(0, limit) + "...";
            }
            return text;
        },
        textify(text, before, after) {
            if (text && text.trim().length > 0) {
                return (before ? before : "") + text + (after ? after : "");
            }
            return "";
        },
        enum(text) {
            if (text) {
                return text.replace(/_/g, " ");
            }
            return text;
        },
        capitalizeFirst(text) {
            return text && text[0].toUpperCase() + text.slice(1);
        },
        copyWith(newValue, source) {
            // clone source object with new value ( newValue can be Json, ex. {height:400} )
            var target = this.clone(source);
            return Object.assign(target, newValue);
        },
        isBlank(object) {
            // check object/string has children
            for (var propName in object) {
                return false;
            }
            // no children and object is numeric/boolean
            if (typeof (object) === 'number' || typeof (object) === 'boolean') {
                return false;
            }
            // blank object: [], {}, "", null, undefined
            return true;
        }
    }
}).$mount('#app')
