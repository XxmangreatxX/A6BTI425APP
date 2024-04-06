//Just implemented it to try but it didnt work

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];
function RouteGuard({ children }) {
  const router = useRouter();
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const authCheck = async (url) => {
      const path = url.split('?')[0];
      if (!PUBLIC_PATHS.includes(path) && !localStorage.getItem('token')) {
        router.push('/login');
      } else {
        await updateAtoms();
      }
    };

    const updateAtoms = async () => {
      const favs = await getFavourites();
      const history = await getHistory();
      setFavourites(favs);
      setSearchHistory(history);
    };

    router.events.on('routeChangeComplete', authCheck);
    authCheck(router.asPath);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);
  return children;
}
export default RouteGuard;