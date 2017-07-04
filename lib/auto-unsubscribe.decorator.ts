export function AutoUnsubscribe(constructor) {
  const original = constructor.prototype.ngOnDestroy;
  constructor.prototype.ngOnDestroy = function () {
    for (let prop in this) {
      // remove class subscriptions array
      if (prop === 'subscriptions' && this[prop] && this[prop].length > 0) {
        this[prop].forEach(item => {
          if (typeof item.unsubscribe === 'function') {
            item.unsubscribe();
          }
        });
        return;
      }
      if (this.hasOwnProperty(prop)) {
        const property = this[prop];
        if (property && (typeof property.unsubscribe === 'function')) {
          property.unsubscribe();
        }
      }
    }
    if (original && typeof original === 'function') {
      original.apply(this, arguments);
    }
  };
}
