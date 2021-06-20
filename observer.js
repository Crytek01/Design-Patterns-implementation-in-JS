const addObserverToObject = (object, updateFunction, observable) => {
  object.observable = observable;
  object.update = () => {
    updateFunction();
  };
};

const addObservableToObject = (object) => {
  object.observers = [];
  object.addObserver = (observer) => {
    object.observers.push(observer);
  };

  object.removeObserver = (pObserver) => {
    const newObservers = object.observers
      .filter((observer) => observer !== pObserver)
      .reduce((acc, observer) => {
        acc.push(observer);
        return acc;
      }, []);

    object.observers = newObservers;
  };

  object.notify = () => {
    object.observers.forEach((observer) => {
      observer.update();
    });
  };
};

const objectObservable = {
  name: "Erick",
  setName: function (name) {
    this.name = name;
    this.notify();
  },
};
addObservableToObject(objectObservable);

const objectObserver = {
  personTalkingTo: "",
};
addObserverToObject(
  objectObserver,
  () => {
    console.log(
      `The observer sees that observable has changed he's name to  ${objectObserver.observable.name}`
    );
  },
  objectObservable
);

objectObservable.addObserver(objectObserver);
objectObservable.setName("Juan");
objectObservable.setName("Rick");
objectObservable.removeObserver(objectObserver);
objectObservable.setName("Carlos");
