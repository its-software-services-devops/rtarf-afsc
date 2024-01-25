<script setup lang="ts">
import { ref } from 'vue';
import type { EssentialLinkProps } from '../components/EssentialLink.vue';
const route = useRoute()
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

const leftDrawerOpen = ref(false)
const initUsername = ref(false)
const username = ref('admin')
function logout() {
  let currentUrl = new URL(window.location)
  localStorage.removeItem('UserProfile')
  location.replace(currentUrl.origin + "/login")
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function setUsername() {
  let local_username = useGetUsername()
  // username.value = local_username
  console.log('get username')
  console.log(local_username)
  // local_username = "admin"
  if (local_username) {
    username.value = local_username
    initUsername.value = true
    console.log(local_username)
    console.log('username set !')
  } else {
    console.log('username not set')
  }

}
function handleBeforeUnload() {
  // Clear local storage or perform other actions
  console.log('clear storage')
  localStorage.clear();
};
// window.addEventListener('beforeunload', handleBeforeUnload);




onBeforeMount(() => {
  // window.removeEventListener('beforeunload', handleBeforeUnload);
  if (typeof window !== 'undefined') {
    console.log('onBeforeMount')
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }
  // useCheckLogin()
  // setUsername()
})
watchEffect(() => {
  // console.log('in watch eff')
  if (route.path != '/login') { // Check if in main page
    // console.log('')

    username.value = 'admin'
    initUsername.value = true

    // setUsername(); // Trigger the function
  }
});
onMounted(() => {
  useCheckLogin()
  setUsername()
  if (typeof window !== 'undefined') {
    console.log('onMounted')
    window.addEventListener('beforeunload', handleBeforeUnload);
  }
})


// onbeforeunload(() => {
//   localStorage.clear()
// })

</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          :glossy="false"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title>
          ศูนย์รักษาความปลอดภัยแห่งชาติ
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <!-- <div v-show="initUsername"> -->
        <div v-show="(route.path != '/login')">

          <q-chip outline color="white" text-color="white" icon="account_circle">
            {{ username }}
          </q-chip>
          <q-btn class="q-ml-md" push color="dark" label="ออกจากระบบ" size="sm" @click="logout()">
          </q-btn>
        </div>



      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

