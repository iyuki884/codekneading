import Vuetify from '../../../node_modules/vuetify'
import '../../../node_modules/vuetify/dist/vuetify.min.css'
import '../../../node_modules/@mdi/font/css/materialdesignicons.css'
import './styles/override-vuetify.styl'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.use(Vuetify)
}
