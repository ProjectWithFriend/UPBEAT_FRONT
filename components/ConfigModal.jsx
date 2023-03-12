import React from 'react';

export default function ConfigModal({props, onConfigChange, onConfigSubmit}) {
    return (
        <div className="modal fade" id="configModal" tabIndex="-1" aria-labelledby="configModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="configModalLabel">Configuration</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="m">Number of Rows:</label>
                                    <input type="number" className="form-control" id="m" min="1"
                                           defaultValue={props.rows}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "rows")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="n">Number of Columns:</label>
                                    <input type="number" className="form-control" id="n" min="1"
                                           defaultValue={props.cols}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "cols")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="init_plan_min">Initial Plan Minutes:</label>
                                    <input type="number" className="form-control" id="init_plan_min" min="0"
                                           max="59" defaultValue={props.initPlanMin}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "initPlanMin")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="init_plan_sec">Initial Plan Seconds:</label>
                                    <input type="number" className="form-control" id="init_plan_sec" min="0"
                                           max="59" defaultValue={props.initPlanSec}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "initPlanSec")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="init_budget">Initial Budget:</label>
                                    <input type="number" className="form-control" id="init_budget"
                                           min="1" defaultValue={props.initBudget}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "initBudget")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="init_center_dep">Initial City Center Deposit:</label>
                                    <input type="number" className="form-control" id="init_center_dep"
                                           min="1" defaultValue={props.initCenterDep}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "initCenterDep")
                                           }}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="plan_rev_min">Revision Minutes:</label>
                                    <input type="number" className="form-control" id="plan_rev_min" min="0"
                                           max="59" defaultValue={props.planRevMin}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "planRevMin")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="plan_rev_sec">Revision Seconds:</label>
                                    <input type="number" className="form-control" id="plan_rev_sec" min="0"
                                           max="59" defaultValue={props.planRevSec}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "planRevSec")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rev_cost">Revision Cost:</label>
                                    <input type="number" className="form-control" id="rev_cost" min="1"
                                           defaultValue={props.revCost}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "revCost")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="max_dep">Maximum Deposit per Region:</label>
                                    <input type="number" className="form-control" id="max_dep" min="1"
                                           defaultValue={props.maxDep}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "maxDep")
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="interest_pct">Interest Rate Percentage:</label>
                                    <input type="number" className="form-control" id="interest_pct" min="0"
                                           max="100" defaultValue={props.interestPct}
                                           onChange={(e) => {
                                               if(e.target.value === "") e.target.value = '0';
                                               onConfigChange(e.target.value, "interestPct")
                                           }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                onClick={onConfigSubmit}>Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>)
}