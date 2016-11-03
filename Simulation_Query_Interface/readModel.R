library(locfit)

ptm<-proc.time()

test_data = read.csv('./test_data.csv', sep=",", header=TRUE)

set.seed(123)

Cl_model<-readRDS("./Cl.rds")

Cdt_model<-readRDS("./Cdt.rds")

Cdp_model<-readRDS("./Cdp.rds")

Cdf_model<-readRDS("./Cdf.rds")

Cm_model<-readRDS("./Cm.rds")

predicted_Cl = predict(Cl_model, newdata = test_data)

predicted_Cdt = predict(Cdt_model, newdata = test_data)

predicted_Cdp = predict(Cdp_model, newdata = test_data)

predicted_Cdf = predict(Cdf_model, newdata = test_data)

predicted_Cm = predict(Cm_model, newdata = test_data) 

predicted_Cl
predicted_Cdt
predicted_Cdp
predicted_Cdf
predicted_Cm

proc.time() - ptm 
