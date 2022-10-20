
const Sidebar = (props) => {

    return (
        <aside className="sideBar">
            <h2>{props.title}</h2>
            <ul>
                {props.children.map((child, i) => <span key={i}>{child}</span>)}
            </ul>
        </aside>
    )
}

export default Sidebar