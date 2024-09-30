import LoadingButton from "@mui/lab/LoadingButton";
import { FormControl, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import CustomSnackBar from "../SnackBar/SnackBar";
import { addGRID } from "../../api/gridAPIs";

interface FormData {
    grid_name: String ,
    output_voltage: String ,
    max_output_current: String,
    output_connector_type: String ,
}

const AddGrid = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [addbuttonloader, setAddButtonLoader] = useState<boolean>(false);
    const [formData, setFormdata] = useState<FormData>({
        grid_name: '',
        output_voltage: '',
        max_output_current: '',
        output_connector_type: '',
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        if (name) {
            setFormdata({
                ...formData,
                [name]: value
            });
        }
    };

    const handleReset = () => {
        setFormdata({
            grid_name: '',
            output_voltage: '',
            max_output_current: '',
            output_connector_type: '',
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAddButtonLoader(true);

        const finalData = {
            ...formData,
            output_voltage: Number(formData.output_voltage),
            max_output_current: Number(formData.max_output_current),
        };


        try {
            const response = await addGRID(finalData);
            console.log(response.data);
            setTimeout(() => {
                handleReset();
                setAddButtonLoader(false);
                setOpen(true);
                setSnackbarType('success');
                setMessage('Grid Added Successfully');
            }, 1000);
        } catch (error) {
            setTimeout(() => {
                setAddButtonLoader(false);
                setOpen(true);
                setSnackbarType('error');
                setMessage('Failed to Add Grid');
                console.error('Error submitting form:', error);
            }, 1000);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className="menu-data">
                        <Loader />
                    </div>
                ) : (
                    <div className="menu-data">
                        <div className="warehouse">
                            <h3>Add Grid</h3>
                            <form className="warehouse-form" onSubmit={handleSubmit}>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Name"
                                        name="grid_name"
                                        onChange={handleChange}
                                        className="textfieldss"
                                        value={formData.grid_name}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Output Voltage"
                                        name="output_voltage"
                                        type="number"
                                        onChange={handleChange}
                                        className="textfieldss"
                                        value={formData.output_voltage}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Max Output Current"
                                        name="max_output_current"
                                        type="number"
                                        onChange={handleChange}
                                        className="textfieldss"
                                        value={formData.max_output_current}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Connector Type"
                                        name="output_connector_type"
                                        onChange={handleChange}
                                        className="textfieldss"
                                        value={formData.output_connector_type}
                                    />
                                </FormControl>
                                <div className="sub-btn">
                                    <LoadingButton
                                        size="small"
                                        type="submit"
                                        color="secondary"
                                        loading={addbuttonloader}
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        disabled={addbuttonloader}
                                        className="btn-save"
                                    >
                                        <span>Save</span>
                                    </LoadingButton>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            <CustomSnackBar
                open={open}
                setOpen={setOpen}
                snackbarType={snackbarType}
                message={message}
            />
        </>
    );
}

export default AddGrid