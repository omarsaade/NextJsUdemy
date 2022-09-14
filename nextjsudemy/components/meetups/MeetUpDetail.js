import styles from './MeetUpDetail.module.css';


function MeetUpDetail(props) {
    return (
        <section className={styles.detail}>
            <img src={props.img} alt={props.title} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>

    )
}

export default MeetUpDetail
