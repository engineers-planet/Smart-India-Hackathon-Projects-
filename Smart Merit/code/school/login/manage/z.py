import statistics as stat
scid = [1,2,3,4]
marks = [[] for i in range(len(scid))]
mean = []
sd = []
f = open('data','r')
l = f.readline()
while l != "":
	l = l.split(' ')
	marks[scid.index(int(l[0]))].append(int(l[2][:-1]))
	l = f.readline()
for i in range(len(scid)):
	if marks[i]:
		mean.append(stat.mean(marks[i]))
		if len(marks[i]) > 1:
			sd.append(stat.stdev(marks[i]))
		else:
			sd.append(0)
	else:
		mean.append(0)
		sd.append(0)
f.seek(0,0)
op = open('op','w')
l = f.readline()
while l != "":
	l = l.split(' ')
	i = scid.index(int(l[0]))
	m = (marks[i][0] - mean[i])/sd[i]
	s = str(scid[i])+" "+l[1]+" "+str(m)+"\n"
	op.write(s)
	l = f.readline()
	marks[i].pop(0)
f.close()
op.close()
