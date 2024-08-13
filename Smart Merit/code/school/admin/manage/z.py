import statistics as stat
import sys
scid = []
f = open('sc','r');
l = f.readline()
while l != "":
	scid.append(int(l[:-1]))
	l = f.readline()
f.close()
marks = [[] for i in range(len(scid))]
sports = [[] for i in range(len(scid))]
arts = [[] for i in range(len(scid))]
club = [[] for i in range(len(scid))]
mean = []
smean = []
amean = []
cmean = []
sd = []
ssd = []
asd = []
csd = []
f = open('data','r')
l = f.readline()
while l != "":
	l = l.split(' ')
	marks[scid.index(int(l[0]))].append(int(l[2]))
	sports[scid.index(int(l[0]))].append(int(l[3]))
	arts[scid.index(int(l[0]))].append(int(l[4]))
	club[scid.index(int(l[0]))].append(int(l[5][:-1]))
	l = f.readline()
for i in range(len(scid)):
	if marks[i]:
		mean.append(stat.mean(marks[i]))
		smean.append(stat.mean(sports[i]))
		amean.append(stat.mean(arts[i]))
		cmean.append(stat.mean(club[i]))
		if len(marks[i]) > 1:
			sd.append(stat.stdev(marks[i]))
			ssd.append(stat.stdev(sports[i]))
			asd.append(stat.stdev(arts[i]))
			csd.append(stat.stdev(club[i]))
		else:
			sd.append(0)
			ssd.append(0)
			asd.append(0)
			csd.append(0)
			
	else:
		mean.append(0)
		sd.append(0)
		smean.append(0)
		ssd.append(0)
		amean.append(0)
		asd.append(0)
		cmean.append(0)
		csd.append(0)
f.seek(0,0)
op = open('op','w')
l = f.readline()
while l != "":
	l = l.split(' ')
	i = scid.index(int(l[0]))
	m = (marks[i][0] - mean[i])/sd[i]
	sp = (sports[i][0] - smean[i])/ssd[i]
	ar = (arts[i][0] - amean[i])/asd[i]
	cl = (club[i][0] - cmean[i])/csd[i]
	s = str(scid[i])+","+l[1]+","+str(m)+","+str(sp)+","+str(ar)+","+str(cl)+"\n"
	op.write(s)
	l = f.readline()
	marks[i].pop(0)
	sports[i].pop(0)
	arts[i].pop(0)
	club[i].pop(0)
f.close()
op.close()
marks = []
source = open('op','r')
dest = open('sc','w')
l = source.readline()
while l != "":
	l = l.split(",")
	l[5] = l[5][:-1]
	marks.append(l)
	l = source.readline()
def acads(l=[]):
	return float(l[2])
def sports(l=[]):
	return float(l[3])
def arts(l=[]):
	return float(l[4])
def club(l=[]):
	return float(l[5])

if (sys.argv[1] == '1'):
	for mark in sorted(marks,key=acads,reverse=True):
		dest.write(",".join(mark))
		dest.write("\n")
elif (sys.argv[1] == '2'):
	for mark in sorted(marks,key=sports,reverse=True):
		dest.write(",".join(mark))
		dest.write("\n")
elif (sys.argv[1] == '3'):
	for mark in sorted(marks,key=arts,reverse=True):
		dest.write(",".join(mark))
		dest.write("\n")
elif (sys.argv[1] == '4'):
	for mark in sorted(marks,key=club,reverse=True):
		dest.write(",".join(mark))
		dest.write("\n")
source.close()
dest.close()
