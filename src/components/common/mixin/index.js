import {
  mapState,
} from 'vuex';
import format from 'utils/format';

export const filterMixin = {
  computed: {
    ...mapState('filters', [
      'area',
      'divisions',
      'regions',
      'review',
      'level',
    ]),
    ...mapState('login', [
      'hospitalId',
    ]),
  },
  methods: {
    formatFilterForRest(arg) {
      let args = { ...arg };
      const {
        limit,
        start,
      } = args;
      args = format.paramsMixin(args, {
        divisions: this.divisions,
        regions: this.regions,
        area: this.area,
        review: this.review,
        level: this.level,
      });

      args = {
        ...args,
        hospitalId: this.hospitalId,
      };

      if (limit) {
        args = {
          ...args,
          limit: Number(limit),
          start: Number(start || 0),
        };
      }

      return args;
    },
  },
};

export const loadingMixin = {
  computed: {
    ...mapState('loading', [
      'loading',
    ]),
  },
};

