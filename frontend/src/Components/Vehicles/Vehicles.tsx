import { useEffect, useState } from 'react';
import '../Warehouse/Warehouse.css';
import { useDispatch, useSelector } from 'react-redux';
import { set_vehicle_count } from '../../Redux/Action/Action';
import VehicleLoader from '../Loader/VehicleLoader';
import { Link, useNavigate } from 'react-router-dom';
import truckimage from '../../assets/truck.gif';
import Paginations from '../Pagination/Paginations';
import { RootState } from '../../Redux/Reducer';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { getAllVehiclesByUserId } from '../../api/vehicleAPIs';


interface VehicleDimensions {
    length: string;
    width: string;
    height: string;
}

interface DriverDetails {
    driver_name: string;
    driver_contact_no: string;
    licence_id: string;
}

interface VehicleData {
    vehicle_number: string;
    vehicle_name: string;
    vehicle_dimensions: VehicleDimensions;
    Driver_details: DriverDetails;
    cooling_units: string | null;
    sensors: string | null;
    vehicle_id: string;
}

const Vehicles = () => {

    const currentUser = useSelector((state: RootState) => state.user.user);

    const [allVehicles, setAllVehicles] = useState<VehicleData[]>([]);
    const [loading, setLoading] = useState(true);
    const vehicleCountDispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [currentpage, setCurrentpage] = useState(1);
    const navigate = useNavigate();

    const fetchAllVehicles = async (page: any, pageSize: any) => {
        try {
            const params = {
                pageSize: pageSize,
                page: page,
            };
            const response = await getAllVehiclesByUserId(currentUser.id?.id, params);
            if (response.data.data.length === 0) {
                vehicleCountDispatch(set_vehicle_count(0));
                setMessage('No Vehicle Found');
            } else {
                setAllVehicles(response.data.data);
                setMessage('');
                setPageCount(response.data.totalPages);
                vehicleCountDispatch(set_vehicle_count(response.data.totalElements));
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
            vehicleCountDispatch(set_vehicle_count(0));
            setMessage('Failed to fetch vehicles');
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        fetchAllVehicles(currentpage - 1, 12);
    }, [currentpage]);

    return loading ? (
        <VehicleLoader />
    ) : allVehicles.length === 0 ? (
        <div className="menu-data">{message}</div>
    ) : (
        <div className="menu-data">
            <div className="warehouses-cont">
                <div>
                    <div >
                        <h2 className="pageHeaders">
                            <KeyboardBackspaceIcon onClick={goBack} />
                            Vehicles
                        </h2>
                    </div>
                    <div className="info-display-cont">
                        {allVehicles.map((vehicle, index) => (
                            <Link
                                className="info-display-body"
                                key={index}
                                to={`/vehicle/${vehicle.vehicle_id}`}
                            >
                                <div className="img-info">
                                    <div className="img">
                                        <img
                                            src={truckimage}
                                            className="personicon"
                                            alt="Truck Icon"
                                        />
                                    </div>
                                    <div className="status">
                                        <p className="username">{vehicle.vehicle_name}</p>
                                        <p >{vehicle.vehicle_number}</p>
                                        <p >
                                            {vehicle.Driver_details.driver_name}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="vehicle-pagination">
                    <Paginations pageCount={pageCount} onPageChange={setCurrentpage} />
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
