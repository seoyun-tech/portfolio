import { useState, useEffect, useRef } from 'react';

/**
 * 요소가 뷰포트에 진입하면 isVisible = true 를 반환하는 hook.
 * 한 번 노출되면 옵저버를 해제한다.
 *
 * @param {number} threshold - 교차 비율 (기본값 0.15)
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
const useInView = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

export default useInView;
