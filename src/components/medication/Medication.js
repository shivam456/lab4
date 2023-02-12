import { Helmet } from 'react-helmet';
import React from 'react';
import { Box, Container, CircularProgress } from '@material-ui/core';
import MedicationList from 'src/components/medication/MedicationList';
import { FhirClientContext } from '../../FhirClientContext';

const Medications = (meds) => (
  <>
    <Helmet>
      <title>Medications | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <MedicationList meds={meds} />
        </Box>
      </Container>
    </Box>
  </>
);

export default class Medication extends React.Component {
    static contextType = FhirClientContext;

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        patient: null,
        error: null
      };
    }
    

    componentDidMount() {
      const client = this.context.client;
      const queryMed = new URLSearchParams();
      var meds = [null];
      queryMed.set('patient', client.patient.id);
      console.log(client);

/* START TO EDIT YOUR CODE HERE: Task 2 use the SMART API 
to get the medications requests for the patient. It can be stopped or ongoing */ 
meds = client.request('MedicationRequest?' + queryMed, {
  pageLimit: 0, // get all pagesMed
  flat: true // return flat array of Observation resources
}).then(medsss => {
  console.log(medsss);
  this.setState({
    meds: medsss,loading: false, error: null
  });
})

 /* END OF WHERE YOU NEED TO EDIT YOUR CODE */ 

    }

    render() {
      const { error, loading, meds } = this.state;

      if (loading) {
        return <CircularProgress />;
      }
      if (error) {
        console.log(error.message);
        return error.message;
      }
      return <Medications {...meds} />;
    }
}
