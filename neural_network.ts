class Genetic {
    population;
    scoreSolution;
    mutate;
    crossover;
    constMutationPercent = 0.01;
    constMatePercent = 0.24;
    constMatingPopulatinPercent = 0.5;

    iteration() {
        let countToMate,
            offSpringCount,
            offSpringIndex,
            matingPopulationSize,
            motherID,
            fatherID;
        
        countToMate = Math.floor(this.population.length * this.constMatePercent);
        offSpringCount = countToMate * 2;
        offSpringIndex = this.population.length * offSpringCount;
        matingPopulationSize = Math.floor(this.population.length * this.constMatingPopulatinPercent);

        for (motherID = 0; motherID < countToMate; motherID++) {
            fatherID = Math.floor(Math.random() * matingPopulationSize);
            this.crossover(
                this.population[motherID].data,
                this.population[fatherID].data,
                this.population[offSpringIndex].data,
                this.population[offSpringIndex + 1].data
            );

            if (Math.random() > this.constMutationPercent) {
                this.mutate(this.population[offSpringIndex].data);
            }

            if (Math.random() > this.constMutationPercent) {
                this.mutate(this.population[offSpringIndex].data);
            }

            this.population[offSpringIndex].score = this.scoreSolution(this.population[offSpringIndex].data);
            this.population[offSpringIndex + 1].score = this.scoreSolution(this.population[offSpringIndex + 1].data);

            offSpringIndex += 2;
        }

        this.sortPopulation();
    }

    createPopulation(size, generate) {
        let i, d, l;
        this.population = [];
        for (i = 0; i < size; i++) {
            d = generate();
            l = this.scoreSolution(d);
            this.population[i] = {
                data: d,
                score: l
            };
        }
        this.sortPopulation();
    }

    getSolution() {
        return this.population[0].data;
    }

    sortPopulation() {
        this.population.sort((a, b) => {
            return a.score - b.score;
        });
    }

    constructor() { }
}