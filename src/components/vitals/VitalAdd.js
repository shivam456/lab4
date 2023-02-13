import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import fhirdata from 'src/__mocks__/fhirdata';
import { FhirClientContext } from 'src/FhirClientContext';
import { client } from 'fhirclient';
import Client from 'fhirclient/lib/Client';

export default class VitalAdd extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        patient: null,
        error: null,
        client: null,
        open: false,
        rr: '',

      };
    }

    componentDidMount() {
      this.setState({ client: this.context.client });
    }

    render() {
      const handleClose = () => {
        this.setState({ open: false });
      };

      const handleSubmit = () => {
        const vitaltypes = ['rr'];
        this.setState({ open: true });

/* START TO EDIT YOUR CODE HERE: Task 3 update your code here. You will have to use the SMART API to add the ability to add the  
 Respiratory rate (rr) observation with the user input */ 
        const today = new Date();

        var data = {
          "resourceType": "Observation",
          "id": "1463412",
          "meta": {
            "versionId": "1",
            "lastUpdated": today.toISOString()
          },
          "status": "final",
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                  "code": "vital-signs",
                  "display": "vital-signs"
                }
              ]
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "9279-1",
                "display": "Respiratory rate"
              }
            ],
            "text": "Respiratory rate"
          },
          "subject": {
            "reference": "Patient/"+this.context.client.patient.id
          },
          "effectiveDateTime": today.toISOString(),
          "issued": today.toISOString(),
          "valueQuantity": {
            "value": rr.value,
            "unit": "breaths/min",
            "system": "http://unitsofmeasure.org",
            "code": "/min"
          }
        }
        this.context.client.create(data);

 /* END OF WHERE YOU NEED TO EDIT YOUR CODE */ 
 
        this.props.getVitals();
      };

      const inputChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

      return (
        <div>
          <Button variant="outlined" color="primary" onClick={() => this.setState({ open: true })}>
            Add New Vitals
          </Button>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Vitals</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
              Respiratory Rate
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="rr"
                  name="rr"
                  label="Respiratory Rate breaths/min"
                  onChange={inputChangeHandler}
                  fullWidth
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Sumbit Vitals
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}