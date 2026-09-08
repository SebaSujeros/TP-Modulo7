class EventBusEmitter
{
    constructor ()
    {
        this._listeners = new Map();
    }

    on (event, callback)
    {
        if (!this._listeners.has(event)) {
            this._listeners.set(event, []);
        }
        this._listeners.get(event).push(callback);
    }

    off (event, callback)
    {
        const callbacks = this._listeners.get(event);
        if (!callbacks) return;
        const index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
    }

    emit (event, payload)
    {
        const callbacks = this._listeners.get(event);
        if (!callbacks) return;
        for (const callback of [...callbacks]) {
            callback(payload);
        }
    }
}

export const EventBus = new EventBusEmitter();