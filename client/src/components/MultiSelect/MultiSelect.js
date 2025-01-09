import React, { useState, useEffect } from "react";

const MultiSelect = ({ data, label, onChange, preSelected, additionalFields = null }) => {
  const [selectedValues, setSelectedValues] = useState([]);

  // Sync preSelected with selectedValues when preSelected changes
  useEffect(() => {
    if (preSelected) {
      setSelectedValues(preSelected);
    }
  }, [preSelected]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSelect = (value) => {
    let updatedValues;
    if (selectedValues.some(item => item.id === value)) {
      updatedValues = selectedValues.filter(item => item.id !== value);
    } else {
      updatedValues = [...selectedValues, { id: value }];
    }
    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };


  const handleExtraChange = (id, field, value) => {
    const updatedValues = selectedValues.map(item => {
      if (item.id === id) {
        if (field === "maritalStatus") {
          if (value === "Married") {
            return { ...item, maritalStatus: value, marriedYear: item.marriedYear || "", divorceYear: undefined };
          } else if (value) {
            return { ...item, maritalStatus: value, divorceYear: item.divorceYear || "", marriedYear: undefined };
          } else {
            return { ...item, maritalStatus: undefined, marriedYear: undefined, divorceYear: undefined };
          }
        } else if (field === "year") {
          if (item.maritalStatus === "Married") {
            return { ...item, marriedYear: value };
          } else if (item.maritalStatus) {
            return { ...item, divorceYear: value };
          }
        }
        return { ...item, [field]: value };
      }
      return item;
    });
    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  const filteredData = data.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="select-container">
      <label>{label}</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="custom-multi-select">
        {filteredData.map(item => (
          <div key={item.id} className="multi-select-item">
            <div
              className={`select-item ${selectedValues.some(selected => selected.id === item.id) ? 'selected' : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              {item.text}
            </div>
            {selectedValues.some(selected => selected.id === item.id) && additionalFields && (
              <div className="additional-fields">
                {additionalFields.includes("relation") && (
                  <select
                    value={selectedValues.find(selected => selected.id === item.id)?.relationshipType || ""}
                    onChange={(e) => handleExtraChange(item.id, "relationshipType", e.target.value)}
                  >
                    <option value="" disabled>Select Relation</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Uncle">Uncle</option>
                    <option value="Aunt">Aunt</option>
                    <option value="Cousin">Cousin</option>
                    <option value="Grandparent">Grandparent</option>
                    <option value="Grandchild">Grandchild</option>
                  </select>
                )}
                {additionalFields.includes("maritalStatus") && (
                  <select
                    value={selectedValues.find(selected => selected.id === item.id)?.maritalStatus || ""}
                    onChange={(e) => handleExtraChange(item.id, "maritalStatus", e.target.value)}
                  >
                    <option value="" disabled>Select Marital Status</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                )}
                {additionalFields.includes("year") && (
                  <input
                    type="number"
                    value={
                      selectedValues.find(selected => selected.id === item.id)?.maritalStatus === "Married"
                        ? selectedValues.find(selected => selected.id === item.id)?.marriedYear || ""
                        : selectedValues.find(selected => selected.id === item.id)?.divorceYear || ""
                    }
                    placeholder="Year"
                    disabled={!selectedValues.find(selected => selected.id === item.id)?.maritalStatus}
                    onChange={(e) => handleExtraChange(item.id, "year", e.target.value)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
