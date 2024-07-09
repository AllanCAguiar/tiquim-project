"use client";
import React from "react";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { Campaign } from "../types/campaign";
import contributions from "../mocks/contribution";

interface TabPanelProps {
  campaign: Campaign;
  index: number;
  value: number;
}

export function AboutTabPanel(props: TabPanelProps) {
  const { campaign, value, index, ...other } = props;

  const listOfContributions = contributions.filter((element) => element.campaignId == campaign.id)!;

  const totalContributions = listOfContributions.reduce(
    (sum, contribution) => sum + contribution.amount,
    0,
  );

  const completedPercentage = (totalContributions / campaign.goal) * 100;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && (
        <Grid container component="main" sx={{ minHeight: "487px", height: "auto" }}>
          <CssBaseline />
          <Grid item xs={12} sm={12} md={6} component={"div"}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 3 }}>
                {campaign.title}
              </Typography>

              <Typography variant="body1" sx={{ mt: 3 }}>
                {campaign.description}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            component={"div"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <PieChart
              series={[
                {
                  data: [
                    { label: "Alcançado", value: completedPercentage, color: "green" },
                    {
                      label: "Restante",
                      value: 100 - completedPercentage,
                      color: "#D1FFBD",
                    },
                  ],
                  innerRadius: 100,
                  outerRadius: 80,
                },
              ]}
              width={300}
              height={200}
              slotProps={{ legend: { hidden: true } }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-160%, -50%)",
                pointerEvents: "none",
              }}
            >
              {Math.floor(completedPercentage)}%
            </Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
