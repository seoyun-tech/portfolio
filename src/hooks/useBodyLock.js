import { useEffect } from 'react';

const useBodyLock = (active) => {
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);
};

export default useBodyLock;
