export function createObserver(targetElement, callback, options = { threshold: 0.1 }) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(true); 
        } else {
          callback(false); 
        }
      });
    }, options);
  
    if (targetElement) {
      observer.observe(targetElement);
    }
  
    return observer;
}
