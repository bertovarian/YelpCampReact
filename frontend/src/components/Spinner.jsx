import { DNA } from 'react-loader-spinner';

const Spinner = ({ texto }) => {
    return (
        <div style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <DNA className="justify-content-center" height={100} width={100} />
            <h3 className="mt-3">{texto}</h3>
        </div>
    );
};

export default Spinner;