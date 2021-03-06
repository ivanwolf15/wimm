import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { HomeAppBar } from '../../../components/AppBar';
import { connect } from '../../../components/utils/Provider';
import SelectItemProvider from '../../../components/utils/SelectItem';
import { Container } from '../../../components/Layout';
import Drawer from '../../../components/Drawer';
import withOpenFormState from '../../../hocs/OpenFormState';
import ActivityForm from './activities/ActivityForm';
import Summary from './activities/Summary';
import Badge from '../../../components/Badge';
import ActivityList from './activities/ActivityList';
import { accountsToUpdate, categoriesToUpdate, activitiesByDay, expensesByDay } from '../../../utils/lambda';
import { dateLabel, formatSum } from '../../../utils/format';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteActivities = this.handleDeleteActivities.bind(this);
  }

  componentDidMount() {
    const { fetchAccounts, fetchActivities, fetchCategories } = this.props;
    fetchActivities();
    fetchAccounts();
    fetchCategories();
  }

  async handleDeleteActivities(selectedActivities) {
    const {
      activities,
      accounts,
      categories,
      deleteActivities,
      updateAccounts,
      updateCategories,
    } = this.props;
    const activitiesToDelete = activities.filter(act => selectedActivities.includes(act.id));
    const updatedAccountsData = accountsToUpdate(activitiesToDelete, accounts);
    const updatedCategoriesData = categoriesToUpdate(activitiesToDelete, categories);
    try {
      await deleteActivities(selectedActivities);
      await updateAccounts(updatedAccountsData);
      await updateCategories(updatedCategoriesData);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      activities,
      activitiesLoading,
      accounts,
      accountsLoading,
      openForm,
      toggleOpenForm
    } = this.props;
    const activityLists = activitiesByDay(activities);
    const expenses = expensesByDay(activityLists);
    return (
      <SelectItemProvider>
        <Container marginTop>
          <Drawer active={openForm}>
            <ActivityForm toggleOpenForm={toggleOpenForm} />
          </Drawer>
          <HomeAppBar
            main
            openForm={openForm}
            formTitle="Registrar movimiento"
            toggleOpenForm={toggleOpenForm}
            handleDeleteItems={this.handleDeleteActivities}
            handleEditItem={() => {}}
          />
          <Summary accounts={accounts} loading={accountsLoading} />
          {Object.keys(activityLists).map((key, index) => (
            <Fragment key={index}>
              <div>
                <Badge
                  left={dateLabel(parseInt(key, 10))}
                  right={expenses[key] > 0 && formatSum(expenses[key])}
                />
              </div>
              <ActivityList activities={activityLists[key]} />
            </Fragment>

          ))}
        </Container>
      </SelectItemProvider>
    );
  }
}

Activities.propTypes = {
  fetchAccounts: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default connect(
  'activities',
  'accounts',
  'categories',
)(
  'fetchActivities',
  'fetchAccounts',
  'fetchCategories',
  'deleteActivities',
  'updateAccounts',
  'updateCategories',
)(withOpenFormState(Activities));
