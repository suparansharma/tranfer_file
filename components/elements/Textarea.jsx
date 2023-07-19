export default function Textarea({rows,label,placeholder,...rest}) {
    return (
      <>
          <div className="mb-3 row">
              <label className="col-md-2 col-form-label ">{label}</label>
              <div className="col-md-10">
  
                  <textarea rows={rows} placeholder={placeholder} className="form-control" {...rest}/>
              </div>
  
          </div>
      </>
    )
  }
  