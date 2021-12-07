<template>
  <div>
    <cinemas-header></cinemas-header>
    <cinemas-list></cinemas-list>
  </div>
</template>

<script>
import cinemasHeader from "@/components/cinemas/CinemasHeader";
import cinemasList from "@/components/cinemas/CinemasList";

export default {
  components: {
    cinemasHeader,
    cinemasList,
  },
};
</script>
