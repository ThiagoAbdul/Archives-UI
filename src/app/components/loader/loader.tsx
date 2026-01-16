import styles from './loader.module.css'

export function Loader(){
    return <div style={{
         zIndex: 2, 
         display: "flex", 
         justifyContent: "center", 
         alignItems: "center",
         position: "absolute",
         backgroundColor: "var(--loader-bg)",
         color: "black",
         top: 0,
         left: 0,
         width: "100vw",
         height: "100vh" 
        }}>
            <div className={styles.loader}>

            </div>
 
    </div>
}