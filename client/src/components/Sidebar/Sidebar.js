
const Sidebar = (props) => {

    return (
        <aside className="sideBar">
            <h2>{props.title}</h2>
            <ul>
                {props.children.map((child, i) => <li key={i}>{child}</li>)}
            </ul>
        </aside>
    )
}

export default Sidebar