import { assign, createMachine } from "xstate";
import { fetchCountries } from "../Utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        onDone: {
            target: 'success',
            actions: assign({
                countries: (_,event) => event.data
            })
        },
        onError: {
            target: 'failure',
            actions: assign({
                error: 'Falló el request'
            })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "booking-tickets",
    initial: "initial",
    predictableActionArguments: true,
    context: {
      passengers: [],
      country: "",
      countries: [],
      error: ''
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
          },
        },
        ...fillCountries
      },
      search: {
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              country: (_, event) => event.country,
            }),
          },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
        },
      },
      passengers: {
        on: {
          CONTINUE: {
            target: "tickets",
            cond: 'moreThanOnePassenger'
          },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
          ADD: {
            target: "passengers",
            actions: assign({
              passengers: (context, event) => [
                ...context.passengers,
                event.passengers,
              ],
            }),
          },
        },
      },
      tickets: {
        after: {
            10000: {
                target: 'initial',
                actions: 'cleanContext'
            }
        },
        on: {
          FINISH: "initial",
        },
      },
    },
  },
  {
    actions: {
      cleanContext: assign({
        passengers: [],
        country: "",
      }),
    },
    guards: {
        moreThanOnePassenger: (context) =>  context.passengers.length > 0
    }
  }
);

export default bookingMachine;
