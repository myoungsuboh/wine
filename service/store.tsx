import {create} from 'zustand';
import {get} from './api';

const useStore = create(set => ({
  test: [],
  loading: false,
  error: null,

  testGet: async () => {
    set({loading: true, error: null});
    try {
      const users = await get('/');
      set({users, loading: false});
    } catch (e) {
      set({error: e, loading: false});
    }
  },
}));

export default useStore;
