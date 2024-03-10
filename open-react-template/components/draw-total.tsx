import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, TooltipProps} from 'recharts';
import React from 'react';

const COLORS = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];

const df_1 = [
    {city: "Harleysville", best_store: ["Kevin Weingarten - Realtor", "Harleysville Veterinary Hospital", "Wawa", "Rita's Italian Ice", "CJ Miller Vacuum Center"], value: 1},
    {city: "Westampton", best_store: ["Di Francesco Pizza", "Charlie Brown's Steakhouse", "Wicked Bagelz", "Burlington County Animal Shelter", "South Jersey Firewood"], value: 1},
    {city: "Bucks", best_store: ["Falls Township Dog Park", "Dominick's Pizzeria", "PennGreen Landscape & Design", "Marisa Boutique", "Bensalem Pizza and Halal Meat"], value: 1},
    {city: "Worcester", best_store: ["Pawsitive Karma Pet Grooming Salon", "Bravo Pizza", "EveryHome Realtors", "Hollywood Style", "Center Point Cleaners"], value: 1},
    {city: "Springfield", best_store: ["Heng's Thai Cuisine", "Panera Bread", "Target", "Sciarrino's Pizzeria", "The Mattress Factory"], value: 1},
    {city: "Pleasant View", best_store: ["Golly G's Coffee, Ice Cream & Sweets", "Dunkin'", "El Dorado", "Pleasant Thyme Cafe", "Leatherwood Distillery"], value: 1},
    {city: "Frontenac", best_store: ["BrickTop's", "LifeSpa - Frontenac", "Tim Hortons Cafe & Bake Shop", "Grassi's Ristorante & Deli", "Plaza Frontenac Cinema"], value: 1},
    {city: "Marcus Hook", best_store: ["Sungate Diner", "PA Welcome Center", "Clanks Pizza Bar", "Marcus Hook Florist", "American Seafood Connection"], value: 1},
    {city: "Truckee", best_store: ["Eastside Deli", "Truckee River RV Park", "Canine Country Truckee", "Tributary Whitewater Tours", "Heaven's Best Carpet Cleaning Lake Tahoe"], value: 1},
    {city: "King Of Prussia", best_store: ["Colonial Marble & Granite", "Macy's", "Desi Village Indian Cuisine", "The North Face King of Prussia", "AT&T Store"], value: 1},

]

const Showcity = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const best_store = payload[0].payload.best_store;

    if (!best_store) {
      return null;
    }

    return (
      <div className="showcity" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <ul>
          {best_store.map((store: string, index: number) => (
            <li key={index}>{store}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export const Draw_Pie_1 = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={df_1}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="city"
                    label={(entry) => entry.name}
                >
                    {
                        df_1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))
                    }
                </Pie>
                <Tooltip content={<Showcity/>}/>
            </PieChart>
        </ResponsiveContainer>
    );
};
