<script setup lang="ts">
import { ref } from 'vue';
import type { EssentialLinkProps } from '../components/EssentialLink.vue';

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
  if (local_username) {
    username.value = local_username
    initUsername.value = true
    console.log('username set !')
  } else {
    console.log('username not set')
  }


}
onMounted(() => {
  useCheckLogin()
  setUsername()
})
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
          Hotel Information App
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <div v-show="initUsername">
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

