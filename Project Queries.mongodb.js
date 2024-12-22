// Select the Database to implement queries on
use("RW&MH")

// Lists the whole JSON Data
db.relation.find().toArray()



// Distribution of mental health conditions across age groups.
let q1 = db.relation.aggregate([
    { $group: { _id: "$Age", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
]).toArray();

console.log(q1)



// How stress levels vary by gender.
let q2 = db.relation.aggregate([
    {
        $group: {
            _id: { gender: "$Gender", stress: "$Stress_Level" },
            count: { $sum: 1 }
        }
    },
    {
        $sort: { "_id.gender": 1, "_id.stress": 1 }
    }
]).toArray();

console.log(q2)



// How hybrid, remote, or on-site work affects productivity.
let q3s1 = db.relation.aggregate([
  {
      $group: {
          _id: { Work_Location: "$Work_Location", Productivity_Change: "$Productivity_Change" },
          count: { $sum: 1 }
      }
  },
  { $sort: { "_id.Work_Location": 1, "count": -1 } }
]).toArray();

console.log(q3s1)

let q3s2 = db.relation.aggregate([
  {
      $project: {
          Work_Location: 1,
          Productivity_Change: {
              $switch: {
                  branches: [
                      { case: { $eq: ["$Productivity_Change", "Increase"] }, then: 1 },
                      { case: { $eq: ["$Productivity_Change", "Decrease"] }, then: -1 },
                      { case: { $eq: ["$Productivity_Change", "No Change"] }, then: 0 }
                  ],
                  default: null
              }
          }
      }
  },
  {
      $group: {
          _id: "$Work_Location",
          avgProductivity: { $avg: "$Productivity_Change" }
      }
  },
  {
      $project: {
          _id: 1,
          avgProductivity: { $round: ["$avgProductivity", 2] }
      }
  }
]).toArray();

console.log(q3s2)



// Does a higher number of meetings correlate with more stress?
let q4 = db.relation.aggregate([
  { $match: { "Stress_Level": "High" } },
  { $group: {
      _id: "$Number_of_Virtual_Meetings",
      count: { $sum: 1 }
  } },
  { $sort: { "_id": 1 } }
]).toArray();

console.log(q4)



// How does access to resources vary across regions?
let q5 = db.relation.aggregate([
    { $match: { Access_to_Mental_Health_Resources: "Yes" } },
    { $group: { _id: "$Region", count: { $sum: 1 } } }
  ]).toArray();

console.log(q5)



// Is there a direct impact of company support on employee satisfaction?
let q6 = db.relation.aggregate([
  {
      $project: {
          Company_Support_for_Remote_Work: 1,
          Satisfaction_with_Remote_Work: {
              $switch: {
                  branches: [
                      { case: { $eq: ["$Satisfaction_with_Remote_Work", "Satisfied"] }, then: 1 },
                      { case: { $eq: ["$Satisfaction_with_Remote_Work", "Neutral"] }, then: 0 },
                      { case: { $eq: ["$Satisfaction_with_Remote_Work", "Unsatisfied"] }, then: -1 }
                  ],
                  default: null
              }
          }
      }
  },
  {
      $group: {
          _id: "$Company_Support_for_Remote_Work",
          avgSatisfaction: { $avg: "$Satisfaction_with_Remote_Work" }
      }
  },
  {
      $project: {
          _id: 1,
          avgSatisfaction: { $round: ["$avgSatisfaction", 2] }
      }
  },
  { $sort: { _id: 1 } }
]).toArray();

console.log(q6)



// Does regular physical activity mitigate mental health conditions?
let q7 = db.relation.aggregate([
  { 
    $match: {
      "Physical_Activity": { $ne: null },
      "Mental_Health_Condition": { $ne: null }
    }
  },
  {
    $group: {
      _id: { 
        physicalActivity: "$Physical_Activity", 
        mentalHealthCondition: "$Mental_Health_Condition" 
      },
      count: { $sum: 1 }
    }
  },
  { 
    $sort: { "_id.physicalActivity": 1, "_id.mentalHealthCondition": 1 } 
  }
]).toArray();

console.log(q7)



// Relationship between sleep quality and stress.
let q8 = db.relation.aggregate([
  {
    $project: {
      Sleep_Quality: 1,
      Stress_Level_Num: {
        $switch: {
          branches: [
            { case: { $eq: ["$Stress_Level", "High"] }, then: 3 },
            { case: { $eq: ["$Stress_Level", "Medium"] }, then: 2 },
            { case: { $eq: ["$Stress_Level", "Low"] }, then: 1 }
          ],
        }
      }
    }
  },
  {
    $group: {
      _id: "$Sleep_Quality",
      avgStress: { $avg: "$Stress_Level_Num" }
    }
  },
  {
    $project: {
      _id: 1,
      avgStress: { $round: ["$avgStress", 2] }
    }
  }
]).toArray();

console.log(q8)



// Which job roles maintain better work-life balance?
let q9 = db.relation.aggregate([
    { $group: { _id: "$Job_Role", avgWorkLifeBalance: { $avg: "$Work_Life_Balance_Rating" } } },
    { $project: { _id: 1, avgWorkLifeBalance: { $round: ["$avgWorkLifeBalance", 2] } } },
  ]).toArray();

console.log(q9)



// How does social isolation differ across regions?
let q10 = db.relation.aggregate([
    { $group: { _id: "$Region", avgSocialIsolation: { $avg: "$Social_Isolation_Rating" } } },
    { $project: { _id: 1, avgSocialIsolation: { $round: ["$avgSocialIsolation", 2] } } },
  ]).toArray();

console.log(q10)



// What factors contribute to higher productivity in remote settings?
let q11 = db.relation.find(
    { "Productivity_Change": "Increase" },
    { Job_Role: 1, Access_to_Mental_Health_Resources: 1, Company_Support_for_Remote_Work: 1 }
  ).toArray();

console.log(q11)



// Highlight employees likely to experience burnout.
let q12 = db.relation.find(
    { Stress_Level: "High", Work_Life_Balance_Rating: { $lte: 2 } }
  ).toArray();

console.log(q12)


// Saving all the results in a JSON file
const fs = require("fs");
const results = {q1, q2, q3s1, q3s2, q4, q5, q6, q7, q8, q9, q10, q11, q12};
fs.writeFileSync("query-results.json", JSON.stringify(results, null, 2));

// Saving the results in individual JSON files
fs.writeFileSync("q1.json", JSON.stringify(q1, null, 2));
fs.writeFileSync("q2.json", JSON.stringify(q2, null, 2));
fs.writeFileSync("q3s1.json", JSON.stringify(q3s1, null, 2));
fs.writeFileSync("q3s2.json", JSON.stringify(q3s2, null, 2));
fs.writeFileSync("q4.json", JSON.stringify(q4, null, 2));
fs.writeFileSync("q5.json", JSON.stringify(q5, null, 2));
fs.writeFileSync("q6.json", JSON.stringify(q6, null, 2));
fs.writeFileSync("q7.json", JSON.stringify(q7, null, 2));
fs.writeFileSync("q8.json", JSON.stringify(q8, null, 2));
fs.writeFileSync("q9.json", JSON.stringify(q9, null, 2));
fs.writeFileSync("q10.json", JSON.stringify(q10, null, 2));
fs.writeFileSync("q11.json", JSON.stringify(q11, null, 2));
fs.writeFileSync("q12.json", JSON.stringify(q12, null, 2));

// End of Script