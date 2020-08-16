<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
      Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
      Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
import store from '../store/store';
function getPageEvents(to, next) {
  const currentPage = +to.query.page || 1;
  store
    .dispatch('event/fetchEvents', {
      page: currentPage,
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    })
    .catch((e) => {
      if (e.response && e.response.status === 404) {
        next({ name: '404', params: { resourse: 'event' } });
      } else {
        next({ name: 'network-issue' });
      }
    });
}
export default {
  components: {
    EventCard,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },

  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(['event', 'user']),
  },
};
</script>
