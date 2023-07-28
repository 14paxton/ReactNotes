## Add event listener to check if table loads
#### add in component you are checking
 ```javascript
useEffect(() => {
        window.parent.postMessage({ action: 'tGrid-loaded' });
    }, []);
```

#### and in other componenet
```javascript
     useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);
```

## Listening for a resizing event
```javascript
useEffect(() => {
        if (tableRef?.current) {
            if (useObserver) {
                const resizeObserver = new ResizeObserver(async () => {
                    Promise.resolve(buildPPTObject())
                })
                if (tableRef?.current) {
                    resizeObserver.observe(tableRef?.current)
                }
                return () => {
                    resizeObserver.disconnect()
                };
            }
            else {
                Promise.resolve(buildPPTObject())
            }
        }

    }, [tableRef?.current]);
```