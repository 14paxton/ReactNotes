
Creating tags

    Ul>(li[className='test')2

Access the Dom

    Const username = React.createRef() [create reference]

    <input ref={this.username} id="username"
      type="text"className="form-control"/> [set reference]

    const username = this.username.current.value; [use ref]

Conditional Rendering

    {error && <div className="alert
      alert-danger">{error}</div>}

[AXIOS]{.underline}

    Patch()

        Used to update 1 or more properties

        Axios.patch(apiEndpoint + '/' + post.id, {title:
          post.title});

    Put()

        Update all properties

            axios.put(apiEndpoint + '/' + post.id, post)

    Interceptors

        axios.interceptors.response.use(success, error)

this.props.history.push('/');

used to navigate

localStorage.setItem('token', response.headers['x-auth-token']);

set local storage and access response header, need to have back end make
headers visible

.header("access-control-expose-headers", "x-auth-token")

[-for hovering]{.underline}

-use onMouseOver() and onMouseOut()

dangerouslySetInnerHTMLset html in a string

{__html: '<p>' + result?.themeSummary +'. <i>Theme Of
Significance.</i></p>'}

<Tooltip title={<div dangerouslySetInnerHTML={modifiedToolTip}/>}
childrenDisplayStyle="inline">

[useEffect()]{.underline}

-used after browser repaints DOM

-react will prioritize UI

React.useEffect(() => {

// Will be invoked on the initial render

// and all subsequent re-renders.

> })

React.useEffect(() => {

// Will be invoked on the initial render

// and when "id" or "authed" changes.

> }, [id, authed])

React.useEffect(() => {

// Will only be invoked on the initial render

> }, [])

React.useEffect(() => {

return () => {

// invoked right before invoking

// the new effect on a re-render AND

// right before removing the component

// from the DOM

}

> })
>
> -Example-
>
> ![](/Users/bpaxton/WebstormProjects/core-client/media/image1.png){width="2.5208333333333335in"
> height="2.9895833333333335in"}
>
> -the orderrender, side effect, render, cleanup, side effect-

## JEST