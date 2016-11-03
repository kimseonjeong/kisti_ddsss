library(locfit)

ptm<-proc.time()

all_data = read.csv('./kflow_result.csv', sep=",", header=TRUE)

test_data = read.csv('./test_data.csv', sep=",", header=TRUE)

all_data = all_data[sample(nrow(all_data)), ]

Cl_model <- locfit(Cl ~ lp(thickness, Umach, AOA, RE, scale=TRUE, nn=0.005), data = all_data)

predicted_Cl = predict(Cl_model, newdata = test_data)

Cdt_model <- locfit(Cdt ~ lp(thickness, Umach, AOA, RE, scale=TRUE, nn=0.005), data = all_data)

predicted_Cdt = predict(Cdt_model, newdata = test_data)

Cdp_model <- locfit(Cdp ~ lp(thickness, Umach, AOA, RE, scale=TRUE, nn=0.005), data = all_data)

predicted_Cdp = predict(Cdp_model, newdata = test_data)

Cdf_model <- locfit(Cdf ~ lp(thickness, Umach, AOA, RE, scale=TRUE, nn=0.005), data = all_data)

predicted_Cdf = predict(Cdf_model, newdata = test_data)

Cm_model <- locfit(Cm ~ lp(thickness, Umach, AOA, RE, scale=TRUE, nn=0.005), data = all_data)

predicted_Cm = predict(Cm_model, newdata = test_data)

saveRDS(Cl_model, "./Cl.rds")

saveRDS(Cdt_model, "./Cdt.rds")

saveRDS(Cdp_model, "./Cdp.rds")

saveRDS(Cdf_model, "./Cdf.rds")

saveRDS(Cm_model, "./Cm.rds")

predicted_Cl
predicted_Cdt
predicted_Cdp
predicted_Cdf
predicted_Cm

proc.time() - ptm