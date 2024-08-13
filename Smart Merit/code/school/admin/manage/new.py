import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plotter
import pandas as pd
file_location = 'final.csv'

df = pd.read_csv(file_location,header=None)
df.columns=['Remark','Percentage']
pieLabels=df['Remark'] 
# Population data
Share     = df['Percentage']
plotter.pie(Share,labels=pieLabels,startangle=90,shadow=True,explode=(0,0.1,0), autopct='%1.1f%%')
plotter.title('Dropout Statistics') 
plotter.savefig('New1.png', bbox_inches='tight')