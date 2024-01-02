import { watch } from 'vue';
import { currentRouteName, GetUserDetails } from './sidebar.vue';

watch(() => currentRouteName.value, (newRoute, oldRoute) => {
if (newRoute != 'LOGIN') {
// GetAllSideNav();
GetUserDetails();
}
});
