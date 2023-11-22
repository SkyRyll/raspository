#!/bin/bash
# Get temp and save in variable
temp=$(vcgencmd measure_temp | cut -d= -f2 | cut -d\' -f1)
# Filter average processor load in the last 1, 5 and 15 minutes
# and save in variables
avgload1=$(cat /proc/loadavg | cut -d" " -f1)
avgload5=$(cat /proc/loadavg | cut -d" " -f2)
avgload15=$(cat /proc/loadavg | cut -d" " -f3)

# Count the number of entries
entry_count=$(mysql --user=skyryll --password=SkyDbAccess systeminfo --silent --skip-column-names -e "SELECT COUNT(*) FROM systemvalues;")

if [ "$entry_count" -ge 15 ]; then
    # Calculate the number of excess entries
    excess=$((entry_count - 14)) # Keep 15 entries, so remove excess

    # Get the date of the oldest entry to keep
    oldest_date=$(mysql --user=skyryll --password=SkyDbAccess systeminfo --silent --skip-column-names -e "SELECT date FROM systemvalues ORDER BY date ASC LIMIT 1 OFFSET $excess;")

    # Delete entries older than the oldest date to keep
    mysql --user=skyryll --password=SkyDbAccess systeminfo <<EOF
    DELETE FROM systemvalues WHERE date < '$oldest_date';
EOF
fi

# Insert current values
mysql --user=skyryll --password=SkyDbAccess systeminfo <<EOF
INSERT INTO systemvalues (date, temp, avgload1, avgload5, avgload15) VALUES (NOW(), $temp, $avgload1, $avgload5, $avgload15);
EOF
