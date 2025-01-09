import { Link } from "react-router-dom";

const relationshipCategories = [
  { key: "Relatives", label: "Relatives", extraField: (r) => r.Relative.relationshipType },
  {
    key: "Spouses",
    label: "Spouses",
    extraField: (s) => {
      const status = s.Spouse.status;
      if (status === "married") {
        return `Married in ${s.Spouse.marriageYear}`;
      } else {
        return `Divorced in ${s.Spouse.divorceYear}`;
      }
    },
  },
  { key: "Parents", label: "Parents" },
  { key: "Children", label: "Children" },
];

const PersonRelations = ({ person }) => {
  return (
    <>
      {relationshipCategories.map(({ key, label, extraField }) => (
        person?.[key]?.length > 0 && (
          <div key={key} className="family__content">
            <h4>
              {label} <span>{person[key].length}</span>
            </h4>
            <div className="family__content-group">
              {person[key].map((relation) => (
                <Link key={relation.id} to={`/people/${relation.id}`} className="family-item">
                  <span>{relation.name}</span>
                  <span>{new Date(relation?.personalDetails?.born?.date).getFullYear()}</span>
                  {extraField && <span>{extraField(relation)}</span>}
                </Link>
              ))}
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default PersonRelations;
